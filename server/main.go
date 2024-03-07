package main

import (
	"github.com/gin-gonic/gin"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB

func initDb() {
	var err error
	db, err = gorm.Open(sqlite.Open("test.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}
	db.AutoMigrate(&ToDo{})
}

func GetDb() *gorm.DB {
	return db
}

func main() {
	r := gin.Default()

	initDb()

	r.GET("/", HelloWorld)
	r.GET("/todos/create", Create)
	r.PUT("/todos/:id", UpdateTodo)
	r.DELETE("/todos/:id", DeleteTodo)
	r.GET("/todos", ListTodos)
	r.PUT("/todos/:id/complete", MarkTodoAsCompleted)
	r.PUT("/todos/:id/incomplete", MarkTodoAsIncomplete)
	r.GET("/todos/completed", ListCompletedTodos)
	r.GET("/todos/notcompleted", ListNotCompletedTodos)
	r.GET("/todos/bytitle", ListTodosByTitle)

	r.Run(":8090")
}