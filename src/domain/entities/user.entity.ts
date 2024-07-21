import omit from 'lodash.omit'

import { UniqueID } from '../valueObjects/cuid.vo'

type UserEntityProps = {
	id?: string
	name: string
	email: string
	password: string
	createdAt?: Date
	updatedAt?: Date
}

type FieldsToOmit = 'password' | 'createdAt' | 'updatedAt' | 'id'

export class UserEntity {
	id: string
	name: string
	email: string
	password: string
	created_at: Date
	updated_at: Date

	constructor(props: UserEntityProps) {
		this.id = props.id || new UniqueID().getValue()
		this.name = props.name
		this.email = props.email
		this.password = props.password
		this.created_at = props.createdAt || new Date()
		this.updated_at = props.updatedAt || new Date()
	}

	getId(): string {
		return this.id
	}

	hideFields(fields: FieldsToOmit[]): Partial<UserEntityProps> {
		return omit(this, fields)
	}
}
