import {InputType, Field, Partial} from '@nestjs/graphql';

@InputType()
export class UpdateBookInput extends PartialType(CreateBookInput){

    @Field()
    'id' : string;
}