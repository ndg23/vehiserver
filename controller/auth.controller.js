
const sign=require('jsonwebtoken').sign

const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (id) => {
  return sign({id,email}, process.env.TOKEN_SECRET, {
    expiresIn: maxAge
  })
};

 async function signUp(req, res) {
  const {pseudo, email, password} = req.body
  try {
    const user = await create({pseudo, email, password });
    res.status(201).json({ user: user._id});
  }
  catch(err) {
    console.log(err);
    res.status(200).send({ err })
  }
}

 async function signIn(req, res) {
  const { email, password } = req.body

  try {
    const user = await login(email, password);
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge});
    res.status(200).json({ user: user._id})
  } catch (err){
    res.status(200).json({ err });
  }
}

 function logout(req, res) {
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/');
}

module.exports={signIn,signUp,logout}