package main

import (
	"encoding/json"
	"fmt"
	"github.com/jasonlvhit/gocron"
	"io/ioutil"
	"log"
	"net/http"
)

type Currency struct {
	code  string
	name  string
	price int32
}

type Country struct {
	name     string
	code     string
	currency Currency
}

func getCountries() []Country {
	resp, err := http.Get("https://restcountries.eu/rest/v2/all")
	if err != nil {
		log.Fatalln(err)
	}
	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Fatalln(err)
	}
	var countries []Country
		b := string(body)
	json.Unmarshal([]byte(b), &countries)
	for i := 0; i < len(countries); i++ {
		fmt.Printf("%+v\n", countries[i])
	}
	return countries
}

func task() {
	fmt.Println("running")
	getCountries()

}

func main() {
	gocron.Every(1).Second().Do(task)
	_, time := gocron.NextRun()
	fmt.Println(time)
	<-gocron.Start()
}
