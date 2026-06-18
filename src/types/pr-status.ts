import type { PickFields } from "./fields.js";
import type { PrFieldMap } from "./pr.js";

export type PrStatusCategory<Fields extends readonly (keyof PrFieldMap)[]> =
    | PickFields<PrFieldMap, Fields>
    | Array<PickFields<PrFieldMap, Fields>>
    | null;

export type PrStatusResult<Fields extends readonly (keyof PrFieldMap)[]> = {
    currentBranch?: PrStatusCategory<Fields>;
    createdBy?: PrStatusCategory<Fields>;
    needsReview?: PrStatusCategory<Fields>;
    assigned?: PrStatusCategory<Fields>;
    mentions?: PrStatusCategory<Fields>;
};
