package data

import (
	"encoding/csv"
	"encoding/json"
	"fmt"
	"io"
	"os"
)

type CSV struct {
	path string
	rows [][]string
}

// USAGE:
// func main() {
// 	filePath := "../data/covid-data.csv"
// 	records, err := csvreader.New(filePath)
// 	if err != nil {
// 		panic(err)
// 	}
// 	fmt.Println("Readed: " + filePath)
//  fmt.Println(records.rows[0])
// }

func (records CSV) GetRows() ([]string, error) {
	var rows []string
	for index := range records.rows {
		row, err := records.GetRow(index)
		if err != nil {
			return rows, err
		}
		rows = append(rows, string(row))
	}
	return rows, nil
}

func (records CSV) GetRow(index int) (string, error) {
	row, err := json.Marshal(records.rows[index])
	if err != nil {
		return string(row), err
	}
	return string(row), nil
}

func (records CSV) PrintRow(index int) {
	fmt.Println(records.rows[index])
}

func (records *CSV) AddRow(row []string) {
	records.rows = append(records.rows, row)
}

func New(filePath string) (CSV, error) {
	records := CSV{path: filePath}

	in, err := os.Open(filePath)
	if err != nil {
		return records, err
	}
	defer in.Close()

	reader := csv.NewReader(in)
	for {
		record, err := reader.Read()
		if err == io.EOF {
			break
		}
		if err != nil {
			return records, err
		}

		records.AddRow(record)
	}
	return records, nil
}
