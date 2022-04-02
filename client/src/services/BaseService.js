class BaseService {
  constructor(route) {
    if(!route) throw new Error("Route not found!");

    this.route = route;
  }
}