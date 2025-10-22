package main

import (
	"context"
	"fmt"
	"sync"
	"time"
)

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}

// struct for Prompt info
type Prompt struct {
	msg      string
	mu       sync.RWMutex
	updateAt time.Time
}

func NewPrompt() *Prompt {
	return &Prompt{msg: "", updateAt: time.Time{}}
}

func (p *Prompt) UpdateMsg(msg string) string {
	p.mu.Lock()
	defer p.mu.Unlock()
	p.msg = msg
	p.updateAt = time.Now().UTC()
	return fmt.Sprintf("just entered %s at %v", p.msg, p.updateAt)
}
