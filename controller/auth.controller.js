const User = require('../model/User');

const sign = require('jsonwebtoken').sign

const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (payload) => {
  return sign(payload, process.env.TOKEN_SECRET, {
    expiresIn: '3y'
  })
};

async function signUp(req, res) {
  const { pseudo, email, password } = req.body
  try {
    const user = await create({ pseudo, email, password });
    res.status(201).json({ user: user._id });
  }
  catch (err) {
    console.log(err);
    res.status(200).send({ err })
  }
}

async function signIn(req, res) {
  const { email, password, imei } = req.body

  try {
    const user = await login(email, imei);
    if (user == null) {
      return res.status(400).json("Connexion impossible")
    }

    const payload = {
      id: user._id,
      uniq: user.uniq,
      role: user.role,
      phone: user.phone,
    }

    const token = createToken(payload);
    res.cookie('jwt', token, { httpOnly: true, maxAge });
    return res.status(200).json({ user: user, token })
  } catch (err) {
    return res.status(500).json({ err });
  }
}


async function login(email, imei) {
  try {
    // Recherchez un utilisateur par son adresse e-mail (email) dans la base de données.
    const userFound = await User.findOne({ email });

    if (!userFound) {
      // L'utilisateur n'a pas été trouvé, gérer l'erreur ou renvoyer un message d'erreur.
      return 'Utilisateur non trouvé';
    }

    // const isPasswordValid = await bcrypt.compare(password, userFound.password);

    // if (!isPasswordValid) {
    //   // Le mot de passe est incorrect, gérer l'erreur ou renvoyer un message d'erreur.
    //   return 'Mot de passe incorrect';
    // }

    if (userFound.uniq && imei !== userFound.uniq) {
      return null
    }
    else if (!userFound.uniq && imei) {

      userFound.uniq = imei;
      await userFound.save();
      return userFound;
    }

  } catch (error) {
    // Gérez les erreurs ici, par exemple, en renvoyant un message d'erreur générique.
    return 'Erreur lors de lauthentification';
  }
}

function logout(req, res) {
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/');
}

module.exports = { signIn, signUp, logout }