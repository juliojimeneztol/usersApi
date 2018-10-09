export class Validator {

    /**
     * name string
     */
    public name: string;

    /**
     * value string
     */
    public value: string;

    /**
     * message string
     */
    public message: string;

    /**
     * error boolean
     */
    public error: boolean;

    /**
     * type string
     */
    public type: string;

    /**
     * data any
     */
    public data: any;

    /**
     * Constructor class
     */
    constructor( name: string = "", value: string = "", type: string = "string", message: string = "", error: boolean = false, data: any = {}){
        this.name       = name;
        this.value      = value;
        this.type       = type;
        this.message    = message;
        this.error      = error;
        this.data       = data;
    }
}