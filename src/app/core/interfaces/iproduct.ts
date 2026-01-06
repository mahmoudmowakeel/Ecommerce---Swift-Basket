import { ICategory } from "../../icategory"

export interface IProduct {

  sold: number
  images: string[]
  subcategory: object[]
  ratingsQuantity: number
  _id: string
  title: string
  slug: string
  description: string
  quantity: number
  price: number
  imageCover: string
  category: ICategory
  brand: object[]
  ratingsAverage: number
  createdAt: string
  updatedAt: string
  id: string
}
