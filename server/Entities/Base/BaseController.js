class BaseController {
  constructor(router, baseHandler) {
    if(!router) throw new Error("Router not found!");
    if(!baseHandler) throw new Error("BaseHandler not found!");

    this.router = router;
    this.baseHandler = new baseHandler();
  }
}