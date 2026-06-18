export type JsonObject = Record<string, unknown>;

export type PickFields<FieldMap extends JsonObject, Fields extends readonly (keyof FieldMap)[]> = {
    [Field in Fields[number]]: FieldMap[Field];
};

export function joinFields(fields: readonly string[]): string {
    if (fields.length === 0) {
        throw new TypeError("At least one JSON field is required.");
    }

    return fields.join(",");
}
