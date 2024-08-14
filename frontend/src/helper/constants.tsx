import { AttributeMap } from "./interfaces";

export const petStatus: AttributeMap = {
    in_adoption: "In adoption",
    adopted: "Adopted",
    awaiting_adoption: "Awaiting Adoption"
}

export const adoptionsStatus: AttributeMap = {
    in_adoption: "In adoption",
    adopted: "Adopted",
    awaiting_adoption: "Awaiting Adoption"
}

export const userRoutes: AttributeMap = {
    "adopter": [
      "/pets",  "/adoptions"
    ],
    "volunteer":[
      "/pets", "/adopters", "/adoptions", "/volunteers"
    ],
    "admin":[
      "/pets", "/adopters", "/adoptions", "/volunteers", "/admin"
    ],
  }