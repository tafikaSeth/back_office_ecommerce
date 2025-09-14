import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Progress } from "../ui/progress"


interface Product {
  readonly name: string
  readonly sales: number
  readonly maxSales: number
  readonly revenue: string
}

const topProducts: readonly Product[] = [
  {
    name: "Chaise en bois",
    sales: 1234,
    maxSales: 1500,
    revenue: "24 680 $",
  },
  {
    name: "Canapé 3 places",
    sales: 987,
    maxSales: 1500,
    revenue: "19 740 $",
  },
  {
    name: "Table à manger",
    sales: 756,
    maxSales: 1500,
    revenue: "15 120 $",
  },
  {
    name: "Lampe de chevet",
    sales: 543,
    maxSales: 1500,
    revenue: "10 860 $",
  },
  {
    name: "Buffet en chêne",
    sales: 432,
    maxSales: 1500,
    revenue: "8 640 $",
  },
] as const;

export function TopProducts() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Meilleurs produits</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {topProducts.map((product: Product) => {
            const percentage = (product.sales / product.maxSales) * 100
            return (
              <div key={product.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-foreground">{product.name}</p>
                  <p className="text-sm text-muted-foreground">{product.revenue}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Progress value={percentage} className="flex-1" />
                  <span className="text-sm text-muted-foreground w-12 text-right">{product.sales}</span>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
