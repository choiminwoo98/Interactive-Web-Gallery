// import original module declarations
import "styled-components";

// and extend them!
declare module "styled-components" {
    export interface DefaultTheme {
        yellow: string;
        gray: {
            very: string;
            normal: string;
            lighter: string;
        };
    }
}
