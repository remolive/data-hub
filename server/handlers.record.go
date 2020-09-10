// handlers.record.go

package main

import (
	"fmt"
	"mime/multipart"
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
)

// RecordUpload - Structure used to handle body of posted records
type RecordUpload struct {
	Title       string                `json:"title" form:"title"`
	Description string                `json:"description" form:"description"`
	File        *multipart.FileHeader `json:"file" form:"file"`
	Columns     string
}

// ErrorPost - Use to return post error
func ErrorPost(c *gin.Context, err error) {
	fmt.Println(err)
	c.AbortWithError(http.StatusNotFound, err)
}

func showRecordsIndex(c *gin.Context) {
	query := c.Request.URL.Query()["q"]

	fmt.Printf("%#v\n", query)

	records := getAllRecords(query)

	c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
	render(c, gin.H{
		"title":   "Home Page",
		"payload": records}, "index.html",
	)
}

func getRawRecord(c *gin.Context) {
	// Check if the record ID is valid
	c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
	if recordID, err := strconv.Atoi(c.Param("record_id")); err == nil {
		// Check if the record exists
		if record, err := getRawRecordByID(recordID); err == nil {
			render(c, gin.H{
				"title":       "Welcome to covid-index project",
				"payload":     record,
				"currentDate": time.Now().Format("2006-01-02")}, "record.html",
			)
		} else {
			c.AbortWithError(http.StatusNotFound, err)
		}
	} else {
		c.AbortWithStatus(http.StatusNotFound)
	}
}

// use in post to validate a record
func validateRecord(c *gin.Context) {
	if recordID, err := strconv.Atoi(c.Param("record_id")); err == nil {
		if record, err := getRawRecordByID(recordID); err == nil {
			record.Validated = true
			c.JSON(http.StatusOK, &record)
		} else {
			c.AbortWithError(http.StatusNotFound, err)
		}
	} else {
		c.AbortWithStatus(http.StatusNotFound)
	}
}

func postRecord(c *gin.Context) {
	var postData RecordUpload

	c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
	errData := c.Bind(&postData)
	file := postData.File

	if errData != nil {
		fmt.Printf("ALERT - %#v\n", errData)
		ErrorPost(c, errData)
	} else {
		fmt.Printf("%#v\n", postData)
		recordID := addRecord(postData, file.Filename)
		err := c.SaveUploadedFile(file, "datagenerator/data/"+file.Filename)
		fmt.Printf("RECORD_ID = %#v\n", recordID)
		columns := createColumns(recordList[recordID-1])
		fmt.Printf("COLUMNS = %#v\n", columns)
		recordList[recordID-1].Content = columns

		if err != nil {
			ErrorPost(c, err)
		}

		c.String(http.StatusOK, "ok")
	}
}
