<?php
/**
 * helper sanitize 
 * @author Julio Jimenez  <juliojimneztol@gmail.com>
 */
namespace App\Utils;

/**
 * Validator class
 */
class Validator {
    
    /**
     * Valida los parametros requeridos en el arreglo keys
     * @param  array $params
     * @return boolean
     * @throws \Exception
     */
    public function validateData(Array $params, Array $keys){
        $params = $this->sanitizeData($params);
        $response = TRUE;
        foreach($keys as $key){
            if(!isset($params[$key]) || empty($params[$key])){
                $response = FALSE;
                throw new \Exception("Parametro no definido $key");
            }//end if
        }//end foreach
        
        return $response;
    }
    
    /**
     * Realiza en saneamiento de un arreglo o string
     * @param array | string $data
     * @param FILTER_PHP $filter
     * @return array | string 
     */
    public function sanitizeData($data, $filter = FILTER_SANITIZE_STRING){
        if( is_array($data) ){
            foreach($data as $key => $value){
                $response[$key] = $this->sanitizeData($value, $filter);
            }//end foreach
        }else{
            $response = trim(filter_var($data, FILTER_SANITIZE_STRING));
        }//end if
        
        return $response;
    }
    
    /**
     * Valida email
     * @param string $email
     * @return boolean
     * @throws \Exception
     */
    public function validateEmail($email){
        $response = TRUE;
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            throw new \Exception("Email no valido");
            $reponse = FALSE;
        }//end if
        
        return $response; 
    }
}

