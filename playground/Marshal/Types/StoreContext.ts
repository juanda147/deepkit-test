import { ReflectionKind, Type, serializer } from '@deepkit/type';
import { StoreFeatures } from './StoreFeatures';
import { OnLoad, f } from '@marcj/marshal';

export class StoreContext {
  @f avgPreparationDurationInSeconds!: number;
  @f features?: StoreFeatures;
  @f name!: string;
  @f timezone!: string;
  @f phoneNumber!: string;
  @f apiId!: string;
  @f latitude!: number;
  @f longitude!: number;
  @f id!: string;
  @f status!: string;

  @OnLoad()
  onLoad(): void {
    if (this.features) this.features._onLoad(this.name);
  }
}

serializer.deserializeRegistry.addDecorator(
  (type: Type) => type.kind === ReflectionKind.class && type.classType === StoreContext,
  (_, state) => {
    state.addCode(`${state.setter}.onLoad();`);
  },
);
