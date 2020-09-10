package main

import "github.com/gin-contrib/cors"

func main() {
	// initializeJWTMiddleware()
	initializeRoutes()
	router.Use(cors.Default())
	router.Run(":3001")
}
