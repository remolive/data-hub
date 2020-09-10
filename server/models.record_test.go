// models.record_test.go

package main

import (
	"testing"
)

// Test the function that fetches all records
func TestGetAllRecords(t *testing.T) {
	rlist := getAllRecords()

	// Check that the length of the list of records returned is the
	// same as the length of the global variable holding the list
	if len(rlist) != len(recordList) {
		t.Fail()
	}

	// Check that each member is identical
	for i, v := range rlist {
		if !compareContent(v.Content, recordList[i].Content) ||
			v.ID != recordList[i].ID ||
			v.Title != recordList[i].Title {

			t.Fail()
			break
		}
	}
}
