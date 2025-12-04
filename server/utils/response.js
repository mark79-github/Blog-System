export const forbidden = (res, error) => res.status(403).json({message: error})

export const missing = (res, error) => res.status(404).json({message: error})

export const serverError = (res, error) => res.status(500).json({message: error})
