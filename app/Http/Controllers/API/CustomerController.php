<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
    public function index()
    {
        $customers = Customer::with(['courier'])->orderBy('created_at','DESC');
        if(request()->q != '') {
            $customers = $customers->where('name','LIKE','%' . request()->q . '%');
        }

        return new CustomerCollection($customers->paginate(10));
    }

    public function store() {
        
        $user = $request->user();
        $request->request->add([
            'point' => 0,
            'deposit' => 0
        ]);

        if($user->role == 3) {
            $request->request->add(['courier_id' => $user->id]);
        }

        $customer = Customer::create($request->all());
        return response()->json(['status' => 'success','data' => $customer]);
    }


    public function edit($id) {
        $customer =  Customer::find($id);
        return responese()->json(['status' => 'success','data' => $customer]);
    }

    public function update(Request $request, $id) {
        
        $customer = Customer::find($id);
        $customer->update($request->all());
        return response()->json(['status' => 'success','data' => $customer]);
    }

    public function destroy($id) 
    {
        $customers = Customer::find($id)->delete();
        return response()->json(['status' => 'success','message' => 'data berhasil dihapus']);
    }
}
