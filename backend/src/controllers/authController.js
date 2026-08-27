import { dbService } from '../services/dbService.js';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'mathquest_jwt_secret_key_2026_super_secure';

export async function register(req, res) {
  try {
    const { name, username, email, password, classStandard, role } = req.body;
    
    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: 'Full name is required.' });
    }
    if (!email || !email.trim()) {
      return res.status(400).json({ success: false, message: 'Email address is required.' });
    }
    if (!password || password.length < 4) {
      return res.status(400).json({ success: false, message: 'Password must be at least 4 characters.' });
    }

    // Student registration must NEVER create an admin account
    const safeRole = role === 'admin' ? 'student' : (role || 'student');

    const result = await dbService.registerUser({ 
      name: name.trim(), 
      username: username ? username.trim() : email.trim().split('@')[0], 
      email: email.trim(), 
      password, 
      classStandard, 
      role: safeRole 
    });

    const token = jwt.sign(
      { id: result.user.id, email: result.user.email, role: result.user.role }, 
      JWT_SECRET, 
      { expiresIn: '7d' }
    );

    return res.status(201).json({
      success: true,
      message: 'Registration successful',
      token,
      user: result.user,
      student: result.student
    });
  } catch (error) {
    return res.status(400).json({ 
      success: false, 
      message: error.message || 'Registration failed.' 
    });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required.' });
    }

    const result = await dbService.loginUser({ 
      email: email.trim(), 
      password,
      expectedRole: 'student'
    });

    if (!result || result.roleMismatch) {
      if (result?.roleMismatch) {
        return res.status(403).json({ 
          success: false, 
          message: 'This account is an Admin account. Please use the Admin Portal tab to log in.' 
        });
      }
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid email or password.' 
      });
    }

    const token = jwt.sign(
      { id: result.user.id, email: result.user.email, role: result.user.role }, 
      JWT_SECRET, 
      { expiresIn: '7d' }
    );

    return res.json({
      success: true,
      message: 'Login successful',
      token,
      user: result.user,
      student: result.student
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message || 'Login failed.' });
  }
}

export async function adminLogin(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Admin email and password are required.' });
    }

    const result = await dbService.loginUser({ 
      email: email.trim(), 
      password,
      expectedRole: 'admin'
    });

    if (!result || result.roleMismatch) {
      return res.status(403).json({ 
        success: false, 
        message: 'Access denied. Invalid admin credentials or student account attempt.' 
      });
    }

    const token = jwt.sign(
      { id: result.user.id, email: result.user.email, role: 'admin' }, 
      JWT_SECRET, 
      { expiresIn: '7d' }
    );

    return res.json({
      success: true,
      message: 'Admin authentication successful',
      token,
      user: { id: result.user.id, email: result.user.email, role: 'admin' },
      student: null
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message || 'Admin authentication failed.' });
  }
}

export async function getProfile(req, res) {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ success: false, message: 'Authentication token required.' });
    }

    const student = dbService.getStudentById(userId);
    if (!student) {
      return res.status(404).json({ success: false, message: 'Student profile not found.' });
    }

    return res.json({ success: true, student });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export async function updateProfile(req, res) {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ success: false, message: 'Authentication required.' });
    }

    const updated = dbService.updateStudentProfile(userId, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Student profile not found.' });
    }

    return res.json({ success: true, message: 'Profile updated successfully', student: updated });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}
