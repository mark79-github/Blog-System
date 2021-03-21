exports.forbidden = (res, error) =>  res.status(403).json({message: error})

exports.missing = (res, error) =>  res.status(404).json({message: error})

exports.serverError = (res, error) => res.status(500).json({message: error})
