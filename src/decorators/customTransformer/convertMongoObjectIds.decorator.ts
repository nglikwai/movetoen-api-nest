export function ConvertMongoObjectIds(): MethodDecorator {
  return (_target: any, _key: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;
    descriptor.value = async function () {
      const response = await originalMethod.apply(this, arguments);
      return JSON.parse(JSON.stringify(response));
    };
    return descriptor;
  };
}
