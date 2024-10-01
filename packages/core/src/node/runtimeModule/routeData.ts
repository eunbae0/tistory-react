import { type FactoryContext, RuntimeModuleID } from '.';

export async function routeVMPlugin(context: FactoryContext) {
  const { routeService } = context;

  return {
    [RuntimeModuleID.RouteForClient]: routeService.generateRoutesCode(),
  };
}
