import jwt from 'jsonwebtoken'

export const generateToken = (user) => {
    return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      isAdmin: user.isAdmin,
    },
    process.env.TOKEN_SECRET || 'caokhahieu',
    {
      expiresIn: '30d',
    }
  );
}

export const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization;
  if(authorization){
    const token = authorization.slice(7, authorization.length); // Bearer
    jwt.verify(
      token,
      process.env.TOKEN_SECRET || 'caokhahieu',
      (err, decode) => {
        if(err) {
          res.status.send({message: 'invalid token'})
        }else{
          req.user = decode;
          next()
        }
      }
    )
  }else{
    res.status(401).send({message: 'no token'})
  }
}

export const isAdmin = (req, res, next) => {
  if(req.user && req.user.isAdmin){
    next()
  }else{
    res.status(401).send({message: 'invalid admin token'})
  }
}

