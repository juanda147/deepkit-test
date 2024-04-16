import { deserialize } from "@deepkit/type";
import { plainToClass } from "@marcj/marshal";


interface ISourceIdentity {}
class SourceIdentity implements ISourceIdentity {}

class TestSource extends SourceIdentity{
    public storeId?: string;
    public checkId?: string;
    public checkNumber?: string; 
}

  const payload = { storeId: '1', checkId: '1', checkNumber: '1' };

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const testDeserialized = <S extends ISourceIdentity>(payload: Record<string, unknown>, type: new (...args: any ) => S) => {
    //const CustomType = type as new (...args: any) => S;

    const resultMarshal = plainToClass(type, payload);
    const resultDeepkit = deserialize<typeof type>(payload); // Correct type?
    console.log("Marshal result:" + resultMarshal);
    console.log("Deepkit result:" + resultDeepkit);
};

testDeserialized<TestSource>(payload, TestSource);

        