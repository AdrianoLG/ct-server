function notFound(req, res, next) {
  const error = new Error(`Ruta no encontrada: ${req.originalUrl}`)
  error.statusCode = 404
  next(error)
}

function errorHandler(error, req, res, next) {
  console.error(error)

  const statusCode = error.statusCode || 500
  const message =
    statusCode === 500 ? 'Error interno del servidor' : error.message

  res.status(statusCode).json({ message })
}

module.exports = {
  notFound,
  errorHandler
}
