import { Provider } from "@angular/core";
import { KeywordPlanerApi } from "./base/keyword-planer-api.base";
import { KeywordPlanerService } from "./services/keyword-planer.service";

export function provideKeywordPlanerService(): Provider {
    return {
      provide: KeywordPlanerApi,
      useClass: KeywordPlanerService
    }
  }