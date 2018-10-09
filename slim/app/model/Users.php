<?php
/**
 * Users model
 * @author Julio Jimenez <juliojimeneztol@gmail.com>
 */

namespace App\Models;
 
use Illuminate\Database\Eloquent\Model;
use Illuminate\Contracts\Pagination\Paginator;
use Illuminate\Database\Capsule\Manager as DB;

/**
 * Users model class
 */
class Users extends Model{
    
   /**
    * @var string 
    */ 
   protected $table = 'users';

   /**
    * @var string
    */
   protected $primaryKey = 'id';
   
   /**
    * @var type 
    */
   public $timestamps = FALSE;
   
    /**
     * Obtener producto por sku
     * @param int $sku
     * @return type
     */
    public function existEmail($email){
	$user = $this->where('email', $email)->get()->first();
        return isset($user->id) ? TRUE : FALSE;
    }
}