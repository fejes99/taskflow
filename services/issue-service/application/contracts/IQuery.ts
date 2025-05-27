export interface IQuery<Input = any, Output = any> {
  execute(input: Input): Promise<Output>;
}
