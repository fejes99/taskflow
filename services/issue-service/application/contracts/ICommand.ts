export interface ICommand<Input = any, Output = void> {
  execute(input: Input): Promise<Output>;
}
