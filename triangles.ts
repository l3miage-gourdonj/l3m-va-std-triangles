export type TriangleType = 'INVALIDE' | 'SCALÈNE' | 'ISOCÈLE' | 'ÉQUILATÉRAL';
export type FCT_TRIANGLE = (a: number, b: number, c: number) => TriangleType;
