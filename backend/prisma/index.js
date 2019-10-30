const { prisma } = require('./generated/prisma-client')

// A `main` function so that we can use async/await
async function main() {
  // Create a new user called `Alice`
  

  // Read all users from the database and print them to the console
  const allUsers = await prisma.restaurants()
  // console.log(allUsers)

}

main().catch(e => console.error(e))
