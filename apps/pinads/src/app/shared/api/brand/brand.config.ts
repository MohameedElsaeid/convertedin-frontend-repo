import { Provider } from "@angular/core"
import { BrandApi } from "./base/brand.base"
import { BrandService } from "./services/brand.service"


export function provideBrandService(): Provider {
  return {
    provide: BrandApi,
    useClass: BrandService
  }
}
