import { Reducer } from 'redux';
import { Identifier } from '../../../types';
export interface PossibleValuesState {
    [relatedTo: string]: {
        error?: string | object;
    } | Identifier[];
}
declare const possibleValuesreducer: Reducer<PossibleValuesState>;
export declare const getPossibleReferenceValues: (state: any, props: any) => any;
export declare const getPossibleReferences: (referenceState: any, possibleValues: any, selectedIds?: any[]) => any;
export default possibleValuesreducer;
