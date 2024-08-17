import { v4 as uuidv4 } from 'uuid';

const createUserId = (req, res, next) => {
  let userId = req.cookies.userId;

  if (!userId) {
    userId = uuidv4();
    res.cookie('userId', userId, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 }); // 1 day
  }

  req.userId = userId;
  next();
};

export default createUserId;