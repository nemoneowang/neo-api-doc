import { GqlOptionsFactory, GqlModuleOptions } from '@nestjs/graphql';
import { Injectable } from '@nestjs/common';
import { join } from 'path';
import { AuthModule } from 'src/auth/auth.module';
@Injectable()
class GraphqlService implements GqlOptionsFactory {
  async createGqlOptions(): Promise<GqlModuleOptions> {
    return {
      include: [AuthModule],
      typePaths: ['./**/*.gql'],
      autoSchemaFile: join(process.cwd(), 'schema.gql'),
      context: ({ req }) => ({ req }),
    };
  }
}
export default GraphqlService;
