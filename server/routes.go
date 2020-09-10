package main

import (
	"net/http"

	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
)

var router *gin.Engine

func initializeRoutes() {
	router = gin.Default()
	router.LoadHTMLGlob("views/*")
	router.Use(static.Serve("/", static.LocalFile("../client/build", true)))

	api := router.Group("/api")
	{
		api.GET("/records", showRecordsIndex)
		api.POST("/records", postRecord)
		api.GET("/record/:record_id", getRawRecord)
		api.POST("/record/:record_id", validateRecord)
	}
	backoffice := router.Group("/backoffice")
	{
		backoffice.GET("/", showRecordsIndex)
		backoffice.GET("/record/:record_id", getRawRecord)
	}
}

// Render one of HTML, JSON or CSV based on the 'Accept' header of the request
// If the header doesn't specify this, HTML is rendered, provided that
// the template name is present
func render(c *gin.Context, data gin.H, templateName string) {
	switch c.Request.Header.Get("Accept") {
	case "application/json":
		c.JSON(http.StatusOK, data["payload"])
	case "application/xml":
		c.XML(http.StatusOK, data["payload"])
	default:
		c.HTML(http.StatusOK, templateName, data)
	}

}
