import mongoose from 'mongoose'
import app from './app'
import config from './config'

async function main() {
  try {
    await mongoose.connect(config.datebase_url as string)

               console.log(`Database is conneted succesfully`)
    app.listen(config.port, () => {
      console.log(`Application listening on port ${config.port}`)
    })
  } catch (error) {
    console.log(`Failed to connnect database`, error)
  }
}

main().catch(err => console.log(err))
