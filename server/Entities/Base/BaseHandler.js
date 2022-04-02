class BaseHandler {
  constructor(entity) {
    if (!entity) throw new Error("Entity not found!");

    this.entity = entity;
  }

  create() {}

  update() {}

  get() {}

  delete() {}
}
