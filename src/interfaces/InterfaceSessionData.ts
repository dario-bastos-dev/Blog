import "express-session"

declare module "express-session" {
          interface SessionData{
                    category?: object;
                    user?: object
          }
}