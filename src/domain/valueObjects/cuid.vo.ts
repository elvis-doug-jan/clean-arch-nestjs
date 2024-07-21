import { createId } from '@paralleldrive/cuid2'

export class UniqueID {
	private value: string

	constructor(cuid?: string) {
		this.value = cuid || createId()
	}

	public getValue(): string {
		return this.value
	}

	public equals(other: UniqueID): boolean {
		return this.value === other.getValue()
	}
}
