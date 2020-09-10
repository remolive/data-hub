package main

import (
	data "covid-index/datagenerator/csvreader"
	"errors"
	"fmt"
	"regexp"
	"strings"
)

type record struct {
	ID             int      `json:"id" binding:"required"`
	Title          string   `json:"title"`
	Description    string   `json:"description"`
	Content        []string `json:"content"` // columns included in the raw content
	Validated      bool     `json:"validated"`
	RawContentPath string   `json:"raw_content_path"`
}

var recordList = []record{
	record{
		ID:             1,
		Title:          "Record 1",
		Description:    "blablabla... description.... blablabla...",
		Content:        []string{"Column 1", "Col 2", "Col 3", "Col 4", "..."},
		RawContentPath: "/home/oremy/covid-index/server/datagenerator/data/covid-data.csv",
	},
	record{
		ID:             2,
		Title:          "Record 2",
		Description:    "blablabla... description.... blablabla...",
		Content:        []string{"Column 1", "Col 2", "Col 3", "Col 4", "..."},
		RawContentPath: "/home/oremy/covid-index/server/datagenerator/data/covid-data.csv",
	},
}

func filterRecords(query string) []record {
	res := []record{}
	r, _ := regexp.Compile(query)
	for _, record := range recordList {
		match := r.MatchString(strings.ToLower(record.Title))
		if match {
			res = append(res, record)
		}
	}
	return res
}

func readRawRecord(record record) data.CSV {
	filePath := record.RawContentPath
	data, err := data.New(filePath)
	if err != nil {
		panic(err)
	}
	return data
}

func createColumns(record record) []string {
	filePath := record.RawContentPath
	data, err := data.New(filePath)
	if err != nil {
		panic(err)
	}
	row, _ := data.GetRow(0)
	fmt.Printf("COLUMNS = %#v\n", row)
	return strings.Split(row, ",")
}

func getAllRecords(query []string) []record {
	if query == nil || query[0] == "" {
		return recordList
	}
	return filterRecords(strings.ToLower(query[0]))
}

func getRawRecordByID(id int) (*record, error) {
	if id > len(recordList) {
		return nil, errors.New("Data not found")
	}

	r := recordList[id-1]
	data := readRawRecord(r) // bug on get
	// columns, err := data.GetRow(0)
	rows, err := data.GetRows()
	r.Content = rows

	if err != nil {
		panic(err)
	}
	return &r, nil
}

func addRecord(form RecordUpload, fileName string) int {
	record := record{
		ID:             len(recordList) + 1,
		Title:          form.Title,
		Description:    form.Description,
		Content:        []string{"Column 1", "Col 2", "Col 3", "Col 4", "..."},
		RawContentPath: "datagenerator/data/" + fileName,
	}
	recordList = append(recordList, record)
	return record.ID
}
