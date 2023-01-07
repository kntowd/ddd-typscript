export class UserUpdateCommand {
  readonly id: string;
  readonly name: string | null;
  readonly email: string | null;

  constructor(
    id: string,
    options?: {
      name?: string | null;
      email?: string | null;
    }
  ) {
    this.id = id;
    this.name = options?.name || null;
    this.email = options?.email || null;
  }
}
