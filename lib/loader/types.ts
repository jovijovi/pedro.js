// Module loader
export type Loader = () => void;

// Loader mapper
export type LoaderMapper = Map<string, Loader>;
