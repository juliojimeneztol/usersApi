<?php
/**
 * Users controller
 * @author Julio Jimenez <juliojimeneztol@gmail.com>
 */
namespace App\Controller;

use Slim\Http\Request;
use Slim\Http\Response;
use Predis\Client;
use Monolog\Logger;
use App\Utils\Validator;
use App\Models\Users;

/**
 * Users controller class
 */
class UsersController{

    /**
     * @var Predis 
     */
    private $redis;
    
    /**
     * @var Logger
     */
    private $logger;
    
    /**
     * @var Validator 
     */
    private $validator;

    /**
     * Constructor
     * @param Predis $redis
     * @param Logger $logger
     */
    public function __construct(Client $redis, Logger $logger, Validator $validator) {
        $this->redis     = $redis;
        $this->logger    = $logger;
        $this->validator = $validator;
    }
    
    /**
     * Rest API GET
     * @param Request $request
     * @param Response $response
     * @param Array $args
     * @return Response
     */
    public function all(Request $request, Response $response){
        $data = $this->getList();
        if(is_null($data)){
            return $response->withStatus(204);
        }else{
            return $response->withStatus(200)->write(json_encode($data));
        }//end if
    }
    /**
     * Rest API GET id 
     * @param Request $request
     * @param Response $response
     * @param Array $args
     * @return Response
     */
    public function get(Request $request, Response $response, Array $args){
        $id   = isset($args['id']) ? $args['id'] : NULL;
        $data = $this->getById($id);
        if(is_null($data)){
            return $response->withStatus(404);
        }else{
            return $response->withStatus(200)->write(json_encode($data));
        }//end if 
    }
    
    /**
     * Rest API POST
     * @param Request $request
     * @param Response $response
     * @return Response
     * @throws Exception
     */
    public function post(Request $request, Response $response){
        $params = $request->getParams();
        try{
            $save = $this->saveUser($params);
            if(!empty($save)){
                return $response->withStatus(200)
                    ->write(json_encode([
                        'status' => TRUE, 
                        'id'     => $save
                    ]));
            }else{
                throw new Exception('Existe un problema al realizar la operacion');
            }//end if
        } catch (\Exception $ex) {
            return $response->withStatus(409)
                ->withHeader('Access-Control-Allow-Origin', 'http://www.front.com')
                ->write(json_encode([
                    'status' => FALSE, 
                    'error' => $ex->getMessage(),
                ]));
        }//end try-catch
    }
    
    /**
     * Rest API PUT
     * @param Request $request
     * @param Response $response
     * @param array $args
     * @return Response
     * @throws Exception
     */
    public function put(Request $request, Response $response, Array $args){
        $params       = $request->getParams();
        $params['id'] = isset($args['id']) ? $args['id'] : NULL;
        try{
            $save = $this->saveUser($params);
            if(!empty($save)){
                return $response->withStatus(200)
                    ->write(json_encode([
                        'status' => TRUE, 
                        'id'     => $save
                    ]));
            }else{
                throw new Exception('Existe un problema al realizar la operacion');
            }//end if
        } catch (\Exception $ex) {
            return $response->withStatus(409)
                ->withHeader('Access-Control-Allow-Origin', 'http://www.front.com')
                ->write(json_encode([
                    'status' => FALSE, 
                    'error' => $ex->getMessage(),
                ]));
        }//end try-catch
    }
    
    /**
     * Rest API DELETE 
     * @param Request $request
     * @param Response $response
     * @param array $args
     * @return Response
     */
    public function delete(Request $request, Response $response, Array $args){
        $id   = isset($args['id']) ? $args['id'] : NULL;
        $data = $this->deleteById($id);
        if($data){
            return $response->withStatus(200)
                ->write(json_encode(['status' => $data]));
        }else{
            return $response->withStatus(409)
                ->withHeader('Access-Control-Allow-Origin', 'http://www.front.com')
                ->write(json_encode([
                    'status' => $data, 
                    'error'  => 'Existe un error al eliminar al usuario',
                ]));
        }//end if
    }
    
    /**
     * Obtiene el registro de un usuario por medio del campo id
     * @param \App\Controller\Int $id
     * @return array | null
     */
    private function getById(Int $id){
        try{
            $this->validator->validateData(['id' => $id], ['id']);
            $cache = md5("user$id");
            $user = $this->redis->get($cache);
            if( !empty($user) ){
                $user = json_decode($user, TRUE);
            }else{
                $user = Users::find($id);
                if( empty($user) ){
                    $this->redis->set($cache, json_encode($user));
                }//end if                
            }//end if
        } catch (\Exception $ex) {
            $this->logger->addNotice($ex->getMessage());
            $user = NULL;
        }//end try-catch 
        
        return $user;
    }
    
    /**
     * Obtiene el listado de direcciones existentes
     * @return array | null 
     */
    private function getList(){
        try{
            $cache = md5("users");
            $users = $this->redis->get($cache);
            if( !empty($users) ){
                $users = json_decode($users, TRUE);
            }else{
                $users = $user = Users::all();
                if( !empty($users) ){
                    $this->redis->set($cache, json_encode($users));
                }else{
                    $users = NULL;               
                }//end if 
            }//end if
        } catch (\Exception $ex) {
            $this->logger->addNotice($ex->getMessage());
            $users = NULL;
        }//end try-catch 
        
        return $users;
    }

    /**
     * Elimina un usuario en la base de datos por medio del campo id
     * @param \App\Controller\Int $id
     * @return boolean
     */
    private function deleteById(Int $id){
        
        try{
            $this->validator->validateData(['id' => $id], ['id']);
            $cacheUser  = md5("user$id");
            $cacheUsers = md5("users");
            $delete = Users::destroy($id);
            if( !empty($delete) ){
                $this->redis->del($cacheUser);
                $this->redis->del($cacheUsers);
                $delete = TRUE;
            }else{
                $delete = FALSE;
            }//end if
        } catch (\Exception $ex) {
            $this->logger->addNotice($ex->getMessage());
            $delete = FALSE;
        }//end try-catch 
        return $delete;
    }
    
    /**
     * 
     * @param array $params
     * @return type
     */
    private function saveUser(Array $params){
        $save = FALSE;
        try{
            $this->validator->validateData( $params, ['name', 'email', 'username']);
            $this->validator->validateEmail($params['email']);
            $params = $this->validator->sanitizeData($params);
            if(!empty($params['id'])){
                $user = Users::find($params['id']);
            }else{
                $user = new Users();
                $this->isEmailExist($params['email']);
            }//end if
            if($user instanceof Users){
                $user->name     = $params['name'];
                $user->email    = $params['email'];
                $user->username = $params['username'];
                $user->save();
                $save = $user->id;
                $this->redis->del(md5("users"));
            }//end if
        } catch (\Exception $ex) {
            $this->logger->addNotice($ex->getMessage());
            throw new \Exception($ex->getMessage());
            $save = FALSE;
        } catch (Illuminate\Database\QueryException $e){
            $this->logger->addNotice($e->getMessage());
            throw new \Exception('Existe un error al insertar en la base de datos');
            $save = FALSE;
        }//end try-catch 
        
        return $save;
    }
    
    /**
     * Valida la existencia del email
     * @param type $email
     * @throws Exception
     */
    private function isEmailExist($email){
        $response = FALSE;
        $model = new Users();
        $exists = $model->existEmail($email);
        if($exists === TRUE ){
            throw new \Exception('El email ya se encuentra registrado');
            $response = TRUE; 
        }//end if
    }
}
