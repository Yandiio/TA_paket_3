<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Role;

class RoleController extends Controller
{
    public function getAllRole() 
    {
        $role = Role::all();
        return response()->json(['status' => 'success','data' => $role]);
    }

    public function getRolePermissions(Request $request) 
    {
        $hasPermission = DB::table('role_has_permission')
                        ->select('permission_name')
                        ->join('permission','role_has_permisssion.permission_id', '=' , 'permission.id')
                        ->where('role_id', $request->role_id)->get();

        return response()->json(['status' => 'success','data' => $hasPermission]);
    }


    public function setRolePermission(Request $request) 
    {
        $this->validate($request,[
            'user_id' => 'required',
            'role' => 'required'
        ]);

        $role = Role::find($request->role_id);
        $role->syncPermissions($request->permissions);
        return response()->json(['status' => 'success','data' => $role]);
    }

    public function setRoleUser(Request $request) 
    {
        $this->validate($request,[
            'user_id' => 'required',
            'role' => 'required'
        ]);

        $user = User::find($request->user_id);
        $user->syncRoles([$request->role]);
        return response()->json(['status' => 'success','data' => $user]);
    }
}
