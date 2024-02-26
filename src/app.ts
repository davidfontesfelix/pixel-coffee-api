import express from 'express'
import { routes } from './routes/routes'
import cors from 'cors'
import swaggerUi, { serve } from 'swagger-ui-express'
import swaggerFile from './swagger.json'
import '../config/dotenv.config'

const app = express()

app.use(cors())
app.use(express.json())

app.use(routes)

let port: string | number

if(process.env.NODE_ENV == 'test') {
  port = 0
} else {
  port = process.env.PORT ?? 3001
}


const CSS_URL =
  "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.11.0/swagger-ui.min.css";

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile, {customCssUrl: CSS_URL}))

const server = app.listen(port, () => {
  console.log('O servidor está rodando na porta: 3001')
})

process.on('SIGTERM', () => {
  console.info('Recebido sinal de encerramento. Encerrando servidor...')
  server.close(() => {
    console.log('Servidor encerrado com sucesso')
    process.exit(0)
  })
})

export default app